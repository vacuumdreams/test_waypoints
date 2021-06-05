import { pathOr } from 'ramda'
import styled, { css } from 'styled-components'

export const buttonCss = css`
    font-size: 1rem;
    padding: 1rem;
    background-color: ${pathOr('', ['theme', 'colors', 'primary', 'main'])};
    color: #FFF;
    text-align: center;

    cursor: pointer;
    transition: background-color ${pathOr('', ['theme', 'transition'])}s;
    border-radius: ${pathOr('', ['theme', 'radius'])}px;
    width: 100%;
    font-weight: ${pathOr('', ['theme', 'fonts', 'primary', 'weight', 'extrabold'])};

    &:disabled {
        cursor: auto;
        background-color: ${pathOr('', ['theme', 'colors', 'neutral', 'main'])};
    }

    &:hover {
        background-color: ${pathOr('', ['theme', 'colors', 'primary', 'weak'])};
    }
`

export const Button = styled.button`
    ${buttonCss}
`

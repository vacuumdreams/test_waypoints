import { path } from 'ramda'
import styled from 'styled-components'
import  { Button } from '../../../../../atoms'

export const AddButton = styled(Button)`
    position: absolute;
    display: block;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 1;
    border-bottom: 2px solid ${path(['theme', 'colors', 'neutral', 'main'])};
    transition: ${path(['theme', 'transition'])}s background-color;

    & span {
        display: block;
        text-align: center;
        width: 100%;
        white-space: nowrap;
        transition: ${path(['theme', 'transition'])}s width, ${path(['theme', 'transition'])}s color;
        top: 50%;
        left: 0;
    }

    [data-state="entered"] & {
        visibility: hidden;
        pointer-events: none;
    }

    [data-state="entering"] &,
    [data-state="entered"] & {
        background-color: #FFF;
    }

    [data-state="entering"] & span,
    [data-state="entered"] & span {
        color: ${path(['theme', 'colors', 'text', 'weak'])};
        width: 0px;
    }
`

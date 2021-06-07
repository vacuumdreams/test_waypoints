import React from 'react'
import { path } from 'ramda'
import styled from 'styled-components'

import { Button } from '../../../../../atoms'
import type { Waypoint } from '../../../../../services/client'
import type { OptionProps } from '../../../../../atoms/autocomplete/Autocomplete'

export type SearchOptionProps = {
    onAddClick: (item: Waypoint, onClose: () => void) => void,
}

const SaveButton = styled(Button)`
    font-size: 0.8rem;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
    width: 3rem;
    transition: ${path(['theme', 'transition'])}s opacity;

    &[data-highlight="false"] {
        opacity: 0;
        pointer-events: none;
    }
`

const SearchItem = styled.div`
    position: relative;
    padding: 1rem 4rem 1rem 1rem;
    display: flex;
    transition: ${path(['theme', 'transition'])}s background-color;

    &[data-highlight="true"] {
        background-color: ${path(['theme', 'colors', 'neutral', 'weak'])};
    }
`

export const SearchOption = React.forwardRef<HTMLDivElement, OptionProps<Waypoint, SearchOptionProps>>(({
    item,
    isHighlighted,
    closeMenu,
    onAddClick,
    children,
    ...rest
}, ref) => (
    <SearchItem {...rest} ref={ref} data-highlight={isHighlighted}>
        <span>{children}</span>
        <SaveButton
            data-highlight={isHighlighted}
            onClick={() => onAddClick(item, closeMenu)}
        >
            +
        </SaveButton>
    </SearchItem>
))

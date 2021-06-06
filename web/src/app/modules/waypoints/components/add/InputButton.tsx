import React, { useState } from 'react'
import styled from 'styled-components'
import { Transition } from 'react-transition-group'

import { Input, Button } from '../../../../../atoms'

type Props = {
    placeholder: string;
    isDisabled: boolean;
    inputProps: HTMLInputElement['attributes'];
}

const TransitionWrap = styled.div`
    position: relative;
`

const StyledButton = styled(Button)`
    text-align: left;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    transition: 0.2s opacity;

    [data-state="entering"] & {
        opacity: 0;
    }
`

export const  InputButton = ({ placeholder, isDisabled, inputProps }: Props) => {
    const [isAdding, setAdding] = useState(false)

    return (
        <Transition in={isAdding} timeout={500}>
            {(state) => (
                <TransitionWrap data-state={state}>
                    <Input
                        {...inputProps}
                        type="search"
                        placeholder={placeholder}
                        disabled={isDisabled}
                        aria-disabled={isDisabled}
                        aria-autocomplete="list"
                        aria-placeholder="Add new waypoint"
                    />
                    {state !== 'entered' && (
                        <StyledButton
                            disabled={isDisabled}
                            onClick={() => setAdding(true)}
                        >
                            <span>{placeholder}</span>
                        </StyledButton>
                    )}
                </TransitionWrap>
            )}
        </Transition>
    )
}

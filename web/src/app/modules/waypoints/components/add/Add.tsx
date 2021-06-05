import React, { useState } from 'react'
import { path } from 'ramda'
import styled from 'styled-components'
import { Transition } from 'react-transition-group'

import { Input } from  '../../../../../atoms'
import { buttonCss } from '../../../../../atoms/button/Button'

type Props = {
    isLoading: boolean
}

const StyledInput = styled(Input)`
  font-weight: ${path(['theme', 'fonts', 'primary', 'weight', 'extrabold'])};
  transition: background-color 0.5s, color 0.5s;
  will-change: background-color, color;

  &::placeholder {
    color: ${path(['theme', 'colors', 'text', 'weak'])};
  }

  &[data-state="exiting"],
  &[data-state="exited"] {
    ${buttonCss}

    &::placeholder {
      color: #FFF;
    }
  }
`

export const Add = ({ isLoading }: Props) => {
    const [isAdding, setAdding] = useState(false)

    return (
        <Transition in={isAdding} timeout={500}>
            {(state) => (
                <form role="search" aria-label="Saved waypoints">
                    <StyledInput
                        type="search"
                        placeholder="Add new"
                        data-state={state}
                        disabled={isLoading}
                        aria-disabled={isLoading}
                        aria-autocomplete="list"
                        aria-placeholder="Add new waypoint"
                        onClick={() => setAdding(true)}
                        onBlur={() => setAdding(false)}
                    />
                </form>
            )}
        </Transition>
    )
}

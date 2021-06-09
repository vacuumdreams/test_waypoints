import React from 'react'
import { path } from 'ramda'
import styled from 'styled-components'

import { Button } from '../../../../../atoms'

export const RemoveButton =  styled(Button)`
    opacity: 0;
    width: 2.5rem;
    height: 2.5rem;
    padding: 0;
    background-color: ${path(['theme', 'colors', 'background', 'dim'])};
    border: 1px solid ${path(['theme', 'colors', 'background', 'main'])};
    transition: ${path(['theme', 'transition'])}s opacity;

    &:hover {
      background-color: ${path(['theme', 'colors', 'background', 'dim'])};
      opacity: 1!important;
    }
`

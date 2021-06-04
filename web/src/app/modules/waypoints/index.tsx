import React from 'react'
import { path } from 'ramda'
import styled from 'styled-components'

import type { ConfigType } from '../../config'
import { useMap } from  '../../../services/map/useMap'
import { Button } from  '../../../atoms'

import { Title, Map, ListContainer } from './components'

type Props = {
  config: ConfigType,
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${path(['theme', 'colors', 'background', 'main'])};
    height: 100vh;
    width: 100vw;
`

const Box = styled.div`
    display: flex;
    flex: 1;
    margin: auto;
    width: 100%;
    padding: 1rem;
    overflow: hidden;
    box-sizing: border-box;
`

export const Waypoints = ({ config }: Props) => {
  const { ref } = useMap(config.mapbox)

  return (
      <Container>
          <Title>This is the way<span>point app</span>.</Title>
          <Box>
              <ListContainer>
                  <Button>Add new</Button>
              </ListContainer>
              <Map ref={ref} />
          </Box>
      </Container>
  )
}

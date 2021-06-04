import React from 'react'
import { path } from 'ramda'
import styled from 'styled-components'

import type { ConfigType } from '../../config'
import { useMap } from  '../../../services/map/useMap'
import { Button } from  '../../../atoms'

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

const List = styled.div`
    height: 100%;
    min-width: 350px;
    width: 25%;
    padding-right: 16px;
`

const Title = styled.h1`
    font-size: 3rem;
    font-family: ${path(['theme', 'fonts', 'title', 'family'])};
    margin: 0;
    padding: 1em 1rem;

    & span {
      font-family: ${path(['theme', 'fonts', 'script', 'family'])};
    }
`

const MapContainer = styled.div`
    flex: 1;
    height: 100%;

    & .mapboxgl-control-container {
      display: none;
    }
`

export const Waypoints = ({ config }: Props) => {
  const { ref } = useMap(config.mapbox)

  return (
      <Container>
          <Title>This is the way<span>point app</span>.</Title>
          <Box>
              <List>
                  <Button>Add new</Button>
              </List>
              <MapContainer ref={ref} />
          </Box>
      </Container>
  )
}

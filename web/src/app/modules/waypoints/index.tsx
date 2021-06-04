import React from 'react'
import styled from 'styled-components'

import type { ConfigType } from '../../config'
import { useMap } from  '../../../services/map/useMap'

type Props = {
  config: ConfigType,
}

const Container = styled.div`
    display: flex;
    height: 100vh;
    width: 100vw;
    align-items: center;
    justify-content: center;
`

const Box = styled.div`
    display: flex;
    width: calc(100% - 36px);
    height: calc(100% - 36px);
`

const List = styled.div`
    height: 100%;
    min-width: 350px;
    width: 25%;
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
          <Box>
              <List />
              <MapContainer ref={ref} />
          </Box>
      </Container>
  )
}

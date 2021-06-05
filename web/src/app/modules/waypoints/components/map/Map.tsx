import React from 'react'
import styled from 'styled-components'

import type { ConfigType } from '../../../../config'
import { useMap } from  '../../../../../services/map/useMap'

type Props = {
  config: ConfigType['mapbox'],
}

const MapComponent = styled.div`
  flex: 1;
  height: 100%;

  & .mapboxgl-control-container {
    display: none;
  }
`

export const Map = ({ config }: Props) => {
    const { ref } = useMap(config)

    return (
        <MapComponent ref={ref} />
    )
}

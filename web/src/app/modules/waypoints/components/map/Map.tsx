import React, { useContext, useEffect } from 'react'
import { path } from 'ramda'
import styled, { ThemeContext } from 'styled-components'
import { Transition } from 'react-transition-group'

import type { ConfigType } from '../../../../config'
import { Blur } from '../../../../../atoms'
import { MapSkeleton } from './Skeleton'

import { useMap } from  '../../../../../services/map/useMap'
import { useWaypoints } from  '../../store'

type Props = {
  config: ConfigType['mapbox'],
}

const MapComponent = styled.div`
  height: 100%;
  width: 100%;
`

const MapContainer = styled(Blur)`
  position: relative;
  flex: 1;
  height: 100%;
  width: 100%;
  border: 3px solid ${path(['theme', 'colors', 'neutral', 'main'])};
`

export const Map = ({ config }: Props) => {
    const theme = useContext(ThemeContext)
    const { ref, isLoading, addMarkers } = useMap({ ...config, mode: theme.mode, markerColor: theme.colors.primary.main })
    const { state } = useWaypoints()

    useEffect(() => {
        if (!isLoading && !state.list.loading && state.list.data.length) {
            addMarkers(state.list.order.map(id => state.list.data[id]))
        }
    }, [state.list.order.join()])

    return (
        <MapContainer data-blur={isLoading}>
            <MapComponent ref={ref} />
            <Transition in={isLoading || state.list.loading} timeout={500}>
                {transitionState => (
                  ['exiting', 'entered', 'entering'].includes(transitionState) && <MapSkeleton isLoading={transitionState === 'entered'} />
                )}
            </Transition>
        </MapContainer>
    )
}

import React from 'react'
import { WaypointsProvider } from './store'
import { WaypointsComponent } from './components'
import type { ConfigType } from '../../config'

type Props = {
  config: ConfigType,
}

export const Waypoints = ({ config }: Props) => (
    <WaypointsProvider>
        <WaypointsComponent config={config}/>
    </WaypointsProvider>
)

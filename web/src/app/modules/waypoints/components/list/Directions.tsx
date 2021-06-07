import React from 'react'
import type { Waypoint } from  '../../../../../services/client'

type Props = {
    items: Waypoint[]
}

export const Directions = ({ items }: Props) => {
    return (
        <div>
            {items.map(({ name }) => <div>{name}</div>)}
        </div>
    )
}

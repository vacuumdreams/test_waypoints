import { useRef, useState, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'

import { SavedWaypoint } from '../client'
import { IndexedWaypoints } from '../../app/modules/waypoints/store/state'

const modeMap = {
    light: 'mapbox://styles/mapbox/light-v10',
    dark: 'mapbox://styles/mapbox/dark-v10',
}

type MapMode = typeof modeMap

type Props  = {
    token: string,
    mode: keyof MapMode,
    markerColor?: string,
}

type MarkerStore  = {
    [key: string]: mapboxgl.Marker,
}

type B = [number, number]
type Bounds = [B?, B?]

const markerStore: MarkerStore = {}

const addMarker = (map: mapboxgl.Map, waypoint: SavedWaypoint, markerColor: string) => {
    const stringid = waypoint.id.toString()
    markerStore[stringid] = new mapboxgl.Marker({ color: markerColor })
        .setLngLat([waypoint.longitude, waypoint.latitude])
        .addTo(map)
    return stringid
}

const removeMarker = (id: string) => {
    if (markerStore[id]) {
        markerStore[id].remove()
        delete markerStore[id];
    }
    return id
}

const calcNewBounds = (bounds: Bounds, item: SavedWaypoint) => {
    const currentLat = parseFloat(item.latitude.toString())
    const currentLng = parseFloat(item.longitude.toString())

    if (!bounds[0]) {
        bounds[0] = [currentLng - 0.001, currentLat - 0.001]
    } else {
        bounds[0][0] = bounds[0][0] > currentLng ? currentLng - 0.001 : bounds[0][0]
        bounds[0][1] = bounds[0][1] > currentLat ? currentLat - 0.001 : bounds[0][1]
    }

    if (!bounds[1]) {
        bounds[1] = [currentLng - 0.001, currentLat - 0.001]
    } else {
        bounds[1][0] = bounds[1][0] < currentLng ? currentLng + 0.001 : bounds[1][0]
        bounds[1][1] = bounds[1][1] < currentLat ? currentLat + 0.001 : bounds[1][1]
    }
    return bounds
}

export const useMap = ({ token, mode, markerColor }: Props) => {
    const [isLoading, setLoading] = useState(true)
    const [ids, setIds] = useState<string[]>([])
    const ref = useRef(null)
    const mapRef = useRef(null)
    const [lng, setLng] = useState(0)
    const [lat, setLat] = useState(0)
    const [zoom, setZoom] = useState(8)

    const manageMarkers = (waypoints: IndexedWaypoints) => {
        if (mapRef.current) {
          const newIds = Object.keys(waypoints)

          // removing markers
          ids.filter(id => !newIds.includes(id))
              .map(id => removeMarker(id))

          // adding markers which are not  already added
          newIds.filter(id => !ids.includes(id))
              .map(id => addMarker(mapRef.current, waypoints[id], markerColor))

          const bounds = newIds.reduce((acc, id) => calcNewBounds(acc, waypoints[id]), [] as Bounds)

          setIds(newIds)

          if (bounds.length) {
              mapRef.current.fitBounds(bounds)
          }
        }
    }

    useEffect(() => {
        mapboxgl.accessToken = token

        mapRef.current = new mapboxgl.Map({
            container: ref.current,
            style: modeMap[mode] || 'mapbox://styles/mapbox/streets-v11',
        })

        mapRef.current.on('move', () => {
            setLng(mapRef.current.getCenter().lng.toFixed(4))
            setLat(mapRef.current.getCenter().lat.toFixed(4))
            setZoom(mapRef.current.getZoom().toFixed(2))
        })

        mapRef.current.on('load', () => {
            setLoading(false)
        })

        return () => {
            mapRef.current.remove()
            mapRef.current = null
        }
    }, [])

    useEffect(() => {
        if (mapRef.current && modeMap[mode]) {
            mapRef.current.setStyle(modeMap[mode]);
        }
    }, [mode])

    return {
        isLoading,
        ref,
        mapRef,
        lng,
        setLng,
        lat,
        setLat,
        zoom,
        setZoom,
        manageMarkers,
    }
}

import { useRef, useState, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'

import { SavedWaypoint } from '../client'

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

export const useMap = ({ token, mode, markerColor }: Props) => {
    const [isLoading, setLoading] = useState(true)
    const [names, setNames] = useState<string[]>([])
    const ref = useRef(null)
    const mapRef = useRef(null)
    const [lng, setLng] = useState(0)
    const [lat, setLat] = useState(0)
    const [zoom, setZoom] = useState(8)

    const addMarkers = (waypoints: SavedWaypoint[]) => {
        if (mapRef.current && waypoints.length) {
          const { addedNames, bounds } = waypoints.reduce((acc, item) => {
              const currentLat = parseFloat(item.coordinates.Y.toString())
              const currentLng = parseFloat(item.coordinates.X.toString())

              if (!acc.bounds[0]) {
                  acc.bounds[0] = [currentLng - 0.001, currentLat - 0.001]
              } else {
                  acc.bounds[0][0] = acc.bounds[0][0] > currentLng ? currentLng - 0.001 : acc.bounds[0][0]
                  acc.bounds[0][1] = acc.bounds[0][1] > currentLat ? currentLat - 0.001 : acc.bounds[0][1]
              }

              if (!acc.bounds[1]) {
                  acc.bounds[1] = [currentLng - 0.001, currentLat - 0.001]
              } else {
                  acc.bounds[1][0] = acc.bounds[1][0] < currentLng ? currentLng + 0.001 : acc.bounds[1][0]
                  acc.bounds[1][1] = acc.bounds[1][1] < currentLat ? currentLat + 0.001 : acc.bounds[1][1]
              }

              if (!acc.addedNames.includes(item.name)) {
                  acc.addedNames.push(item.name)
                  new mapboxgl.Marker({ color: markerColor })
                      .setLngLat([currentLng, currentLat])
                      .addTo(mapRef.current)
              }
              return acc
          }, { addedNames: [...names], bounds: [] })

          setNames(addedNames)
          mapRef.current.fitBounds(bounds)
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
        addMarkers,
    }
}

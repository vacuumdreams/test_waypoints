import { useRef, useState, useEffect, useCallback } from 'react'
import mapboxgl from 'mapbox-gl'

import { Waypoint } from '../client'

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

    const addMarkers = useCallback((waypoints: Waypoint[]) => {
        if (!isLoading) {
          const { addedNames, bounds } = waypoints.reduce((acc, item) => {
              if (!acc.bounds[0] || (acc.bounds[0][0] > item.longitude && acc.bounds[0][1] > item.latitude)) {
                  acc.bounds[0] = [item.longitude - 0.001, item.latitude - 0.001]
              }
              if (!acc.bounds[1] || (acc.bounds[1][0] < item.longitude && acc.bounds[1][1] < item.latitude)) {
                  acc.bounds[1] = [item.longitude + 0.001, item.latitude + 0.001]
              }

              if (!acc.addedNames.includes(item.name)) {
                  acc.addedNames.push(item.name)
                  new mapboxgl.Marker({ color: markerColor })
                      .setLngLat([item.longitude, item.latitude])
                      .addTo(mapRef.current)
              }
              return acc
          }, { addedNames: [...names], bounds: [] })

          setNames(addedNames)
          mapRef.current.fitBounds(bounds)
        }
    }, [isLoading, names.length])

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

        mapRef.current.addControl(new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
        }))
    }, [])

    useEffect(() => {
        if (mapRef.current && modeMap[mode]) {
            mapRef.current.setStyle(modeMap[mode]);
        }
    }, [mode])

    return {
        isLoading: isLoading,
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

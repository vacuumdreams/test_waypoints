import { useState, useCallback } from 'react'

type ModeType = 'driving' | 'walking' | 'cycling'

type Route = {
    distance: number,
    duration: number,
    geometry: {
        coordinates: Array<[number, number]>,
    },
}

type RouteCollection = {
    routes: Route[],
}

type Props  = {
  token: string,
}

export const useDirections = ({ token }: Props) => {
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState<null | string>(null)

    const searchForPlace = useCallback(async (mode: ModeType, coordinates: Array<[number, number]>): Promise<Route[]> => {
        setLoading(true)
        setError(null)
        const coordinatesQuery = coordinates.map(latLng => latLng.join(',')).join(';')

        return fetch(`https://api.mapbox.com/directions/v5/mapbox/${mode}/${coordinatesQuery}?geometries=geojson&access_token=${token}`)
            .then(res => res.json() as Promise<RouteCollection>)
            .then((res) => {
                setLoading(false)
                return res.routes
            })
            .catch(err => {
              setError(err.message)
              setLoading(false)
              return []
            })
    }, [token])

    return {
        isLoading,
        error,
        searchForPlace,
    }
}

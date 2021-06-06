import { useState, useCallback } from 'react'

import type { Waypoint } from '../client'

type Feature = {
    place_name: string,
    geometry: {
        coordinates: number[],
    },
}

type FeaturesCollection = {
    features: Feature[],
}

type Props  = {
  token: string,
}

export const useSearch = ({ token }: Props) => {
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState<null | string>(null)

    const searchForPlace = useCallback(async (placeName:  string): Promise<Waypoint[]> => {
        setLoading(true)
        setError(null)
        return fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(placeName)}.json?access_token=${token}`)
            .then(res => res.json() as Promise<FeaturesCollection>)
            .then((res) => {
                setLoading(false)
                return res.features.map((feature) => ({
                  name: feature.place_name,
                  latitude: feature.geometry.coordinates[1],
                  longitude: feature.geometry.coordinates[0],
                }))
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

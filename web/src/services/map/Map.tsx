import { useRef, useState, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'

type Props  = {
  token: string,
}

export const useMap = ({ token }: Props) => {
    const ref = useRef(null);
    const mapRef = useRef(null);
    const [lng, setLng] = useState(-70.9);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(9);

    useEffect(() => {
        mapboxgl.accessToken = token

        mapRef.current = new mapboxgl.Map({
            container: ref.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        });

        mapRef.current.on('move', () => {
            setLng(mapRef.current.getCenter().lng.toFixed(4));
            setLat(mapRef.current.getCenter().lat.toFixed(4));
            setZoom(mapRef.current.getZoom().toFixed(2));
        });
    }, []);

    return {
        ref,
        mapRef,
        lng,
        setLng,
        lat,
        setLat,
        zoom,
        setZoom,
    }
}

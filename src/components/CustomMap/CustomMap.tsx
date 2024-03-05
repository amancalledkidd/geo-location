import './CustomMap.scss'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import { useState, useCallback } from 'react'
import { GeoLocation } from '../../types/GeoLocation'

type MapProps = {
    location: GeoLocation | undefined;
}


const CustomMap = ({location}: MapProps) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [map, setMap] = useState<google.maps.Map | null> (null);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_TOKEN
    })

    const onLoad = useCallback((map: google.maps.Map) => {
        if (location) {
            const center = new google.maps.LatLng(location.latitude, location.longitude);
            map.setCenter(center);
        }
        setMap(map);
    }, [location]);
    
    const onUnmount = useCallback(() => {
        setMap(null);
    }, []);

    const containerStyle = {
        width: '300px',
        height: '300px',
        borderRadius: '10px',
        border: '1px solid #f5f5f5ad'
    }



    return isLoaded ? (
        <GoogleMap
        mapContainerStyle={containerStyle}
        center={location ? { lat: location.latitude, lng: location.longitude } : undefined}
        zoom={12}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
  ) : <></>
}

export default CustomMap

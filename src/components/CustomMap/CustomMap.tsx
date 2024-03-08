import './CustomMap.scss';
import { GoogleMap, useJsApiLoader, Marker, DirectionsRenderer, Autocomplete } from '@react-google-maps/api';
import { useState, useCallback, ChangeEvent, useEffect } from 'react';
import { GeoLocation } from '../../types/GeoLocation';


type MapProps = {
    location: GeoLocation | undefined;
    workLocation: GeoLocation;
};

type Library = 'places'
const libraries: Library[] = ['places']

const CustomMap = ({ location, workLocation }: MapProps) => {
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>(null);
    const [distance, setDistance] = useState<string>('');
    const [duration, setDuration] = useState<string>('');
    const [origin, setOrigin] = useState<string>(location ? `${location.latitude},${location.longitude}` : 'London, UK');
    const [destination, setDestination] = useState<string>(`${workLocation.latitude},${workLocation.longitude}`);
    
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_TOKEN,
        libraries: libraries,
    });

    useEffect(() => {
        if (isLoaded) {
            // This is where you could set a default map center or perform other map setup tasks
            console.log("Map API is loaded, ready to initialize the map or perform initial actions");
        }
    }, [isLoaded]);
    
    useEffect(() => {
        if (map && origin && destination) {
            calculateRoute();
        }
    }, [map, origin, destination]);

    const lat: number | undefined = location?.latitude;
    const lng: number | undefined = location?.longitude;

    const position: google.maps.LatLngLiteral = {
        lat: lat !== undefined ? lat : 51.509865,
        lng: lng !== undefined ? lng : -0.118092,
    };

    

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

    const calculateRoute = async () => {
        if (!map || !origin || !destination) return;

        const directionsService = new google.maps.DirectionsService();

        try {
            const results = await directionsService.route({
                origin,
                destination,
                travelMode: google.maps.TravelMode.DRIVING,
            });

            setDirectionsResponse(results);
            const leg = results.routes[0].legs[0];
            setDistance(leg.distance ? leg.distance.text : 'N/A');
            setDuration(leg.duration ? leg.duration.text : 'N/A');
        } catch (error) {
            console.error('Failed to calculate route:', error);
        }
    };

    const clearRoute = () => {
        setDirectionsResponse(null);
        setDistance('');
        setDuration('');
        setOrigin('');
        setDestination('');
    };

    const handleLocationChange = (event: ChangeEvent<HTMLInputElement>) => setOrigin(event.target.value);
    const handleDestinationChange = (event: ChangeEvent<HTMLInputElement>) => setDestination(event.target.value);

    const containerStyle = {
        width: '300px',
        height: '300px',
        borderRadius: '10px',
        border: '1px solid #f5f5f5ad',
    };

    return isLoaded ? (
        <div className='custom-map-container'>
            <GoogleMap
                mapContainerStyle={containerStyle}
                zoom={12}
                onLoad={onLoad}
                onUnmount={onUnmount}
            >
                <Marker position={position} />
                {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
            </GoogleMap>
            <div className="map-search-form">
                <div className="map-search-form__input-container">
                    <Autocomplete>
                        <input className="map-search-form__input" type="text" placeholder="Origin" onChange={handleLocationChange} value={origin} />
                    </Autocomplete>
                    <Autocomplete>
                        <input className="map-search-form__input" type="text" placeholder="Destination" onChange={handleDestinationChange} value={destination} />
                    </Autocomplete>
                </div>
                <div className='map-search-form__button-container'>
                    <button className="map-search-form__button" onClick={calculateRoute}>Search</button>
                    <button className="map-search-form__button" onClick={clearRoute}>Clear</button>
                </div>
                <div className="map-search-form__info">
                    <p>Distance: {distance}</p>
                    <p>Journey Time: {duration}</p>
                </div>
            </div>
        </div>
    ) : <></>;
};

export default CustomMap;

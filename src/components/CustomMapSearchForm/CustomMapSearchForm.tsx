import './CustomMapSearchForm.scss'
import { Autocomplete } from '@react-google-maps/api'
import { ChangeEvent } from 'react';

type CustomMapSearchFormProps = {
    duration: string;
    distance: string;
    destination: string;
    origin: string;
    setOrigin: (origin: string) => void;
    setDestination: (destination: string) => void;
    clearClick: () => void;
    searchClick: () => void;
}

const CustomMapSearchForm = ({
    distance, 
    duration, 
    destination,
    origin,
    setOrigin,
    setDestination,
    searchClick, 
    clearClick
    }: CustomMapSearchFormProps) => {

    const handleLocationChange = (event: ChangeEvent<HTMLInputElement>) => setOrigin(event.target.value);
    const handleDestinationChange = (event: ChangeEvent<HTMLInputElement>) => setDestination(event.target.value);

    return (
        <div className="map-search-form">
            <div className="map-search-form__input-container">
                <Autocomplete>
                    <input className="map-search-form__input-container__location" type="text" placeholder="location" onChange={handleLocationChange} value={origin}/>
                </Autocomplete>
                <Autocomplete>
                    <input className="map-search-form__input-container__destination" type="text" placeholder="destination" onChange={handleDestinationChange} value={destination}/>
                </Autocomplete>
            </div>
            <div className="map-search-form__info">
                <p className="map-search-form__info__distance">distance: {distance}</p>
                <p className="map-search-form__info__duration">duration: {duration}</p>
            </div>
            <div className='map-search-form__button-container'>
                <button 
                    className="map-search-form__button-container__search"
                    onClick={searchClick}>Search
                </button>

                <button 
                    className="map-search-form__button-container__clear"
                    onClick={clearClick}>Clear
                </button>
            </div>
            
        </div>
    )
}   

export default CustomMapSearchForm

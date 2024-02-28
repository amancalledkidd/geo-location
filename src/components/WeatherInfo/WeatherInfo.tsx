import { useState } from 'react'
import { GeoLocation } from '../../types/GeoLocation'
import { WeatherApiResponse } from '../../types/WeatherApiResponse'
import './WeatherInfo.scss'

const WeatherInfo = () => {
    
    const [location, setLocation] = useState<GeoLocation>()
    const [weather, setWeather] = useState<WeatherApiResponse>()
    

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            setLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            })
        })
    } else {
            console.log('Geolocation is not supported by this browser.')
        }

    const fetchWeather = async () => {
        try {
            const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_WEATHER_TOKEN}&q=${location?.latitude},${location?.longitude}`)
            if (!response.ok) {
                throw new Error('Failed to get weather info.')
            }
            const data = await response.json()
            setWeather(data)
        } catch (error) {
            console.error(error)
        } finally {
            console.log('Weather info fetched')
        }
        
    }



    return (
        <div className="weather-info">
            <h1 className='weather-info__title'>WeatherInfo</h1>
            {!location ?  <h1>Loading...</h1> : <button onClick={fetchWeather}>Get Weather</button>}
            {weather && <h1>{weather.location.name}</h1>}
            
        </div>
    )
}

export default WeatherInfo

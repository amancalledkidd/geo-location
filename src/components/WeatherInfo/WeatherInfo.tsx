import { useEffect, useState } from 'react'
import { GeoLocation } from '../../types/GeoLocation'
import { WeatherApiResponse } from '../../types/WeatherApiResponse'
import './WeatherInfo.scss'

const WeatherInfo = () => {
    
    const [location, setLocation] = useState<GeoLocation>()
    const [weather, setWeather] = useState<WeatherApiResponse>()
    
    useEffect(() => {
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
    }, [])

    useEffect(() => {
        if (location) {
            fetchWeather()
        }
    }, [location])


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
            
            {!weather  &&  <h1>Loading...</h1> }
            {weather && (
                <div className='weather-info__card'>
                    <p className="weather-info__card__location">{weather.location.name}</p>
                    <p className="weather-info__card__temp-c">{weather.current.temp_c}°c</p>
                    <img className="weather-info__card__condition-img"src={weather.current.condition.icon} alt={weather.current.condition.text} />
                    <p className="weather-info__card__condition">{weather.current.condition.text}</p>
                    
                </div>
            )}
            
        </div>
    )
}

export default WeatherInfo
